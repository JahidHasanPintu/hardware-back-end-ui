import { useEffect, useState } from 'react';
import getBaseUrl from '../Components/BaseURL/getBaseUrl';

const usePermissions = (role_id) => {
  const [permissions, setPermissions] = useState([]);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    if (!role_id) return; // Skip fetching if role_id is not provided

    fetch(`${baseUrl}/roles/${role_id}`)
      .then(res => res.json())
      .then(data => setPermissions(data.data.permissions));
  }, [role_id, baseUrl]);

  return permissions;
};

export default usePermissions;
