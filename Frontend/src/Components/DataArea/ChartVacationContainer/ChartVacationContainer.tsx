
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import appConfig from '../../../Utils/Config';
import ChartVacation, { VacationData } from '../ChartVacation/ChartVacation';

function ChartVacationContainer(): JSX.Element {
  const [vacationData, setVacationData] = useState<VacationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<VacationData[]>(appConfig.getVacationPopularityChart);
        console.log(response.data, 'Fetched Data');
        setVacationData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleExportCSV = () => {
    if (vacationData.length === 0) {
      return; 
    }

    const csvContent = 'data:text/csv;charset=utf-8,';
    const header = 'Destination,Follower Count\n';
    const rows = vacationData.map((item) => `${item.destination},${item.followerCount}`).join('\n');

    const encodedUri = encodeURI(csvContent + header + rows);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vacation_data.csv');
    document.body.appendChild(link);
    link.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ChartVacation data={vacationData} onExportCSV={handleExportCSV} />;
}

export default ChartVacationContainer;






