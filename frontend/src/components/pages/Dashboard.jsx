import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useAuth from '../hooks/useAuth.jsx'; 
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

import Navbar from './Navbar.jsx';

const Dashboard = () => {
    const { loading, user, error } = useAuth(); 
  const [leads, setLeads] = useState([]);
  const [campaignFilter, setCampaignFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const [chartData, setChartData] = useState({ byPlatform: {}, byCampaign: {} });
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [allPlatforms, setAllPlatforms] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get('http://localhost:3000/api/dash/leads', {
      params: {
        campaign: campaignFilter,
        platform: platformFilter,
        fromDate,
        toDate,
        limit,
        offset
      }
    });
    setLeads(res.data.leads);
    setTotal(res.data.total);
    updateChartData(res.data.leads);
  };

  const updateChartData = (leadsData) => {
    const byPlatform = {};
    const byCampaign = {};

    leadsData.forEach(lead => {
      byPlatform[lead.platform] = (byPlatform[lead.platform] || 0) + lead.leads;
      byCampaign[lead.campaign] = (byCampaign[lead.campaign] || 0) + lead.leads;
    });

    setChartData({ byPlatform, byCampaign });
  };


  useEffect(() => {
    fetchLeads();
  }, [campaignFilter, platformFilter, fromDate, toDate, offset]);

  useEffect(() => {
    // Fetch all unique campaign/platform options from initial data
    axios.get('http://localhost:3000/api/dash/leads').then(res => {
      const campaigns = [...new Set(res.data.leads.map(lead => lead.campaign))];
      const platforms = [...new Set(res.data.leads.map(lead => lead.platform))];
      setAllCampaigns(campaigns);
      setAllPlatforms(platforms);
    });
  }, []);

  const handlePrev = () => setOffset(Math.max(offset - limit, 0));
  const handleNext = () => {
    if (offset + limit < total) setOffset(offset + limit);
  };

  const barData = (labels, values, label) => ({
    labels,
    datasets: [{
      label,
      data: values,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }]
  });

  const handleClearFilters = () => {
    setCampaignFilter('');
    setPlatformFilter('');
    setFromDate('');
    setToDate('');
    setOffset(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Navbar />
      <h2 className="text-3xl font-bold mb-6 text-blue-800">📊 Lead Dashboard</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Campaign Filter:</label>
          <select value={campaignFilter} onChange={e => setCampaignFilter(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Campaigns</option>
            {allCampaigns.map(camp => (
              <option key={camp} value={camp}>{camp}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Platform Filter:</label>
          <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Platforms</option>
            {allPlatforms.map(plat => (
              <option key={plat} value={plat}>{plat}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">From Date:</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">To Date:</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mt-6">
          <button onClick={handleClearFilters} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto mb-6">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Campaign</th>
              <th className="p-4 text-left">Platform</th>
              <th className="p-4 text-left">Leads</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-4">{lead.date}</td>
                <td className="p-4">{lead.campaign}</td>
                <td className="p-4">{lead.platform}</td>
                <td className="p-4">{lead.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mb-10">
        <button onClick={handlePrev} disabled={offset === 0} className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-300">
          Prev
        </button>
        <button onClick={handleNext} disabled={offset + limit >= total} className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:bg-gray-300">
          Next
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Leads by Platform</h3>
          <Bar data={barData(Object.keys(chartData.byPlatform), Object.values(chartData.byPlatform), 'Leads')} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Leads by Campaign</h3>
          <Bar data={barData(Object.keys(chartData.byCampaign), Object.values(chartData.byCampaign), 'Leads')} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
