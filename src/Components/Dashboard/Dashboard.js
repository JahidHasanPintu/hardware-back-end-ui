import React, { useEffect, useState } from 'react';
import { useAuth } from '../../api/AuthContext';
import usePermissions from '../../hooks/usePermissions';
import WeeklyRevenueChart from './WeeklyRevenueChart ';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const permissions = usePermissions(user.role_id);
  const hasViewPermission = permissions.includes('dashboard.view');
  const [typOfData, setTypeOfData] = useState('yearly');
  const [orderStatus, setOrderStatus] = useState('pending');
  const [stats, setStats] = useState('');
  const baseUrl = getBaseUrl();


  const data = [
    { date: '2023-08-01', revenue: 1000 },
    { date: '2023-08-08', revenue: 1200 },
    { date: '2023-08-15', revenue: 900 },
    // Add more data entries for each week...
  ];

  useEffect(() => {
    const getAllStats = async () => {
      const response = await fetch(`${baseUrl}/orders/stats?state=${typOfData}&order_status=${orderStatus}`);
      const { success, data, totalItem } = await response.json();

      if (success) {
        setStats(data);

      } else {
        console.error("Error fetching data");
      }
    };
    getAllStats();
  }, [typOfData, orderStatus]);


  const [offers, setOffers] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await axios.get(`${baseUrl}/cupons/offer`);
        const defaultDate = formatDateForInput(response.data.data.expire_date) || ''; // Get default date from fetched data
        setOffers(response.data.data.expire_date);
        setDate(defaultDate);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOffers();
  }, []);

  const formatDateForInput = (dateString) => {
    if (!dateString) {
      return ''; // Return an empty string for null or undefined values
    }
    const formattedDate = new Date(dateString).toISOString().slice(0, 10);
    return formattedDate;
  };


  const handleDateChange = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${baseUrl}/cupons/offer/create`, // Update with the correct endpoint
        { date }, // Send the selected date to the server
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      toast.success(response.data.message);
      // Add toast or alert here for successful update

    } catch (error) {
      console.error(error);
      // Add toast or alert here for error
    }
  };

  return (
    <div>
      {
        hasViewPermission ? (
          <div>

            <div class="d-flex justify-content-between align-items-center flex-wrap grid-margin">
              <div>
                <h4 class="mb-3 mb-md-0">Welcome to Dashboard</h4>
              </div>
              <>
                <div class="page-content">
                  <div class="col-md-12">
                    <div class="col-md-12  row ">
                      <div className="col-md-4  dashboard-card nopadding">
                        <div className="btn m-2 w-100 bg-success card-inner  ">
                          <h3 className="text-white">Today Order</h3>
                          <h3 className="text-white mt-3" style={{ fontSize: "30px" }}>
                            {stats?.today?.todayTotalOrder}

                          </h3>
                        </div>
                      </div>
                      <div className="col-md-4 dashboard-card nopadding">
                        <div className="btn m-2 w-100 btn-primary card-inner">
                          <h3 className="text-white">Today Pending Order</h3>
                          <h3 className="text-white mt-3" style={{ fontSize: "30px" }}>
                            {stats?.today?.todayTotalPending}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-4 dashboard-card nopadding">
                        <div className=" btn m-2 w-100 bg-info card-inner btn-info card-inner">
                          <h3 className="text-white">Today Delivered Order</h3>
                          <h3 className="text-white mt-3" style={{ fontSize: "30px" }}>
                            {stats?.today?.todayTotalDelivered}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-4  dashboard-card nopadding mt-2">
                        <div className="btn m-2 bg-warning card-inner w-100 btn-warning card-inner">
                          <h3 className="text-white">Today Revenue</h3>
                          <h3 className="text-white mt-3" style={{ fontSize: "30px" }}>
                            {stats?.today?.total_revenue || 0}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-group flatpickr col-md-6 me-2 mb-2 mb-md-0" id="dashboardDate" style={{ maxWidth: '350px' }}>
                  {/* <h4>
                    Update Offer Expire Date:
                  </h4> */}
                  <span class="input-group-text input-group-addon bg-transparent border-primary" data-toggle><i data-feather="calendar" class="text-primary"></i>Offer Expire Date</span>
                  <input
                    onChange={handleDateChange}
                    value={date}

                    type="date"
                    className="form-control bg-transparent border-primary"
                    placeholder="Select date"
                    data-input
                  />
                  <button onClick={handleSubmit}> Update</button>
                </div>
              </>
              {/* <div class="d-flex align-items-center flex-wrap text-nowrap">
          <div class="input-group flatpickr wd-200 me-2 mb-2 mb-md-0" id="dashboardDate">
            <span class="input-group-text input-group-addon bg-transparent border-primary" data-toggle><i data-feather="calendar" class="text-primary"></i></span>
            <input type="text" class="form-control bg-transparent border-primary" placeholder="Select date" data-input/>
          </div>
          <button type="button" class="btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
            <i class="btn-icon-prepend" data-feather="printer"></i>
            Print
          </button>
          <button type="button" class="btn btn-primary btn-icon-text mb-2 mb-md-0">
            <i class="btn-icon-prepend" data-feather="download-cloud"></i>
            Download Report
          </button>
        </div> */}
            </div>

            {/* <div class="row">
        <div class="col-12 col-xl-12 stretch-card">
          <div class="row flex-grow-1">
            <div class="col-md-4 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="card-title mb-0">New Customers</h6>
                    <div class="dropdown mb-2">
                      <a type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" class="icon-sm me-2"></i> <span class="">View</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" class="icon-sm me-2"></i> <span class="">Edit</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" class="icon-sm me-2"></i> <span class="">Delete</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" class="icon-sm me-2"></i> <span class="">Print</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" class="icon-sm me-2"></i> <span class="">Download</span></a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-12 col-xl-5">
                      <h3 class="mb-2">3,897</h3>
                      <div class="d-flex align-items-baseline">
                        <p class="text-success">
                          <span>+3.3%</span>
                          <i data-feather="arrow-up" class="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div class="col-6 col-md-12 col-xl-7">
                      <div id="customersChart" class="mt-md-3 mt-xl-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="card-title mb-0">New Orders</h6>
                    <div class="dropdown mb-2">
                      <a type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" class="icon-sm me-2"></i> <span class="">View</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" class="icon-sm me-2"></i> <span class="">Edit</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" class="icon-sm me-2"></i> <span class="">Delete</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" class="icon-sm me-2"></i> <span class="">Print</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" class="icon-sm me-2"></i> <span class="">Download</span></a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-12 col-xl-5">
                      <h3 class="mb-2">35,084</h3>
                      <div class="d-flex align-items-baseline">
                        <p class="text-danger">
                          <span>-2.8%</span>
                          <i data-feather="arrow-down" class="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div class="col-6 col-md-12 col-xl-7">
                      <div id="ordersChart" class="mt-md-3 mt-xl-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="card-title mb-0">Growth</h6>
                    <div class="dropdown mb-2">
                      <a type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" class="icon-sm me-2"></i> <span class="">View</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" class="icon-sm me-2"></i> <span class="">Edit</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" class="icon-sm me-2"></i> <span class="">Delete</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" class="icon-sm me-2"></i> <span class="">Print</span></a>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" class="icon-sm me-2"></i> <span class="">Download</span></a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-md-12 col-xl-5">
                      <h3 class="mb-2">89.87%</h3>
                      <div class="d-flex align-items-baseline">
                        <p class="text-success">
                          <span>+2.8%</span>
                          <i data-feather="arrow-up" class="icon-sm mb-1"></i>
                        </p>
                      </div>
                    </div>
                    <div class="col-6 col-md-12 col-xl-7">
                      <div id="growthChart" class="mt-md-3 mt-xl-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  */}

            {/* <div class="row">
        <div class="col-12 col-xl-12 grid-margin stretch-card">
          <div class="card overflow-hidden">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-baseline mb-4 mb-md-3">
                <h6 class="card-title mb-0">Revenue</h6>
                <div class="dropdown">
                  <a type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                  </a>
                  
                </div>
              </div>
              <div class="row align-items-start">
                <div class="col-md-7">
                  <p class="text-muted tx-13 mb-3 mb-md-0">Revenue is the income that a business has from its normal business activities, usually from the sale of goods and services to customers.</p>
                  <WeeklyRevenueChart data={data} />
                </div>
                <div class="col-md-5 d-flex justify-content-md-end">
                  <div class="btn-group mb-3 mb-md-0" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-primary">Today</button>
                    <button type="button" class="btn btn-outline-primary d-none d-md-block">Week</button>
                    <button type="button" class="btn btn-primary">Month</button>
                    <button type="button" class="btn btn-outline-primary">Year</button>
                  </div>
                </div>
              </div>
              <div id="revenueChart" ></div>
            </div>
          </div>
        </div>
      </div>  */}

            {/* <div class="row">
        <div class="col-lg-7 col-xl-8 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-baseline mb-2">
                <h6 class="card-title mb-0">Monthly sales</h6>
                <div class="dropdown mb-2">
                  <a type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton4">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" class="icon-sm me-2"></i> <span class="">View</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" class="icon-sm me-2"></i> <span class="">Edit</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" class="icon-sm me-2"></i> <span class="">Delete</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" class="icon-sm me-2"></i> <span class="">Print</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" class="icon-sm me-2"></i> <span class="">Download</span></a>
                  </div>
                </div>
              </div>
              <p class="text-muted">Sales are activities related to selling or the number of goods or services sold in a given time period.</p>
              <div id="monthlySalesChart"></div>
            </div> 
          </div>
        </div>
        <div class="col-lg-5 col-xl-4 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-baseline">
                <h6 class="card-title mb-0">Cloud storage</h6>
                <div class="dropdown mb-2">
                  <a type="button" id="dropdownMenuButton5" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" class="icon-sm me-2"></i> <span class="">View</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" class="icon-sm me-2"></i> <span class="">Edit</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" class="icon-sm me-2"></i> <span class="">Delete</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" class="icon-sm me-2"></i> <span class="">Print</span></a>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" class="icon-sm me-2"></i> <span class="">Download</span></a>
                  </div>
                </div>
              </div>
              <div id="storageChart"></div>
              <div class="row mb-3">
                <div class="col-6 d-flex justify-content-end">
                  <div>
                    <label class="d-flex align-items-center justify-content-end tx-10 text-uppercase fw-bolder">Total storage <span class="p-1 ms-1 rounded-circle bg-secondary"></span></label>
                    <h5 class="fw-bolder mb-0 text-end">8TB</h5>
                  </div>
                </div>
                <div class="col-6">
                  <div>
                    <label class="d-flex align-items-center tx-10 text-uppercase fw-bolder"><span class="p-1 me-1 rounded-circle bg-primary"></span> Used storage</label>
                    <h5 class="fw-bolder mb-0">~5TB</h5>
                  </div>
                </div>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary">Upgrade storage</button>
              </div>
            </div>
          </div>
        </div>
      </div>  */}

            {/* <div class="row">
        <div class="col-lg-5 col-xl-4 grid-margin grid-margin-xl-0 stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-baseline mb-2">
                <h6 class="card-title mb-0">New Customers</h6>
    
              </div>
              <div class="d-flex flex-column">
                <a href="#" class="d-flex align-items-center border-bottom pb-3">
                  <div class="me-3">
                    <img src="../assets/images/faces/face2.jpg" class="rounded-circle wd-35" alt="user"/>
                  </div>
                  <div class="w-100">
                    <div class="d-flex justify-content-between">
                      <h6 class="text-body mb-2">Leonardo Payne</h6>
                      <p class="text-muted tx-12">12.30 PM</p>
                    </div>
                    <p class="text-muted text-start tx-13">Hey! there I'm available...</p>
                  </div>
                </a>
                
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-7 col-xl-8 stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-baseline mb-2">
                <h6 class="card-title mb-0">Recent Orders</h6>
              </div>
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th class="pt-0">#</th>
                      <th class="pt-0">Project Name</th>
                      <th class="pt-0">Start Date</th>
                      <th class="pt-0">Due Date</th>
                      <th class="pt-0">Status</th>
                      <th class="pt-0">Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>NobleUI jQuery</td>
                      <td>01/01/2022</td>
                      <td>26/04/2022</td>
                      <td><span class="badge bg-danger">Released</span></td>
                      <td>Leonardo Payne</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div> 
          </div>
        </div>
      </div>   */}
          </div>
        ) : (

          <>
            <LoadingSpinner />
            <p>checking permission.</p>
          </>
        )
      }
    </div>

  );
};

export default Dashboard;