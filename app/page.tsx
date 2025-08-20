"use client"
import React, {useState} from 'react';
import {

  Search,

  ArrowRight,
  X,
  Menu

} from 'lucide-react';

// Types
interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: 'blue' | 'green' | 'teal' | 'red';
}

interface OverviewCardProps {
  title: string;
  total: string;
  active: string;
  archived: string;
  riders?: string;
  subscribers?: string;
  image?: string; // Optional image for the card
}

interface PropertyCardProps {
  label: string;
  title: string;
  image: string;
  index: number;
}

// Optimized Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, color }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    teal: 'text-teal-600',
    red: 'text-red-600'
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className={`text-[19px] font-bold mb-1 ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="flex items-center space-x-2 text-[10px] font-medium">
        <div className=" text-gray-600 ">{title}</div>

        {isPositive ? (
          <img src='/images/arrowup.png' alt='arrow up' />
        ) : (
          <img src='/images/arrowdown.png' alt='arrow down' />
        )}
        <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
          {change}
        </span>
      </div>
    </div>
  );
};

// Overview Card Component
const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  total,
  active,
  archived,
  riders,
  image,
  subscribers
}) => (
  <div className="bg-white rounded-2xl border overflow-hidden">
    <div className="flex items-center justify-between px-4 py-3 bg-[#F9FAFB]">
      <div className="flex items-center">
        <div className="w-8 h-8  rounded-lg flex items-center justify-center ">
          <img src={image} alt='home icon' />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700">
        View all
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>

    <div className="grid grid-cols-3 px-4 py-6 gap-4">
      <div>
        <div className="text-xs text-gray-500 mb-1">Total</div>
        <div className="text-xl font-bold text-gray-900">{total}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">
          {riders ? 'Riders' : 'Active'}
        </div>
        <div className="text-xl font-bold text-gray-900">
          {riders || active}
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">
          {subscribers ? 'Subscribers' : 'Archived'}
        </div>
        <div className="text-xl font-bold text-gray-900">
          {subscribers || archived}
        </div>
      </div>
    </div>
  </div>
);

// Property Card Component
const PropertyCard: React.FC<PropertyCardProps> = ({ label, title, image, index }) => (

  <div className="relative rounded-lg overflow-hidden group cursor-pointer">

    <div className="aspect-video bg-gray-200">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      // loading="lazy"
      />
    </div>
    <div className="absolute bottom-4 mb-4 px-4 w-full ">
      <div className="text-white text-xs font-medium mb-1">{label}</div>
      <h4 className="text-white font-semibold">{title}</h4>
    </div>
    <div className="absolute bottom-4 w-full  ">
      <div className='flex justify-center space-x-1' >
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'
              }`}
          />
        ))}
      </div>

    </div>
  </div>
);

// Chart Component (Simplified)
const SalesChart: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  // Chart data representing the bars in the image
  const chartData = [
    { month: 'Jan', blue: 35, green: 25, red: 10 },
    { month: 'Feb', blue: 0, green: 30, red: 8 },
    { month: 'Mar', blue: 20, green: 6, red: 14 },
    { month: 'Apr', blue: 15, green: 25, red: 9 },
    { month: 'May', blue: 22, green: 6, red: 10 },
    { month: 'Jun', blue: 50, green: 40, red: 20 },
    { month: 'Jul', blue: 35, green: 30, red: 12 },
    { month: 'Aug', blue: 25, green: 7, red: 20 },
    { month: 'Sep', blue: 40, green: 3, red: 15 },
  ];

  return (
    <div className="h-64 relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
        <span>50m</span>
        <span>40m</span>
        <span>30m</span>
        <span>20m</span>
        <span>10m</span>
        <span>0</span>
      </div>

      {/* Chart area */}
      <div className="ml-12 h-full flex items-end justify-between px-1">
        {chartData.map((data, index) => (
          <div key={data.month} className="flex flex-col items-center space-y-1 flex-1">
            {/* Bars container */}
            <div className="flex items-end space-x-0.5 h-48">
              {data.blue > 0 && (
                <div
                  className="bg-blue-500 w-1 rounded-t-sm"
                  style={{ height: `${(data.blue / 50) * 100}%` }}
                />
              )}
              {data.green > 0 && (
                <div
                  className="bg-green-500 w-1 rounded-t-sm"
                  style={{ height: `${(data.green / 50) * 100}%` }}
                />
              )}
              {data.red > 0 && (
                <div
                  className="bg-red-500 w-1 rounded-t-sm"
                  style={{ height: `${(data.red / 50) * 100}%` }}
                />
              )}
            </div>
            {/* Month label */}
            <span className="text-xs text-gray-500 mt-2">{data.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Nav: React.FC = () => {
  return (
     <div className="md:flex  items-center justify-between w-full md:space-x-8 space-x-0 space-y-6 md:px-0 px-6 md:py-0 py-6 md:space-y-0" >
              <button className="flex rounded-md items-center space-x-2 text-gray-900 bg-[#F5F5F5] md:px-5 px-4 py-2  font-medium  ">
                <img src='/images/HomeIcon.png' alt='home-icon' />
                <span className='font-semibold' >Dashboard</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 md:px-5 px-4  ">
                <img src='/images/Toolbox.png' alt='Toolbox-icon' />
                <span>Listings</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 md:px-5 px-4  hover:text-gray-900 ">
                <img src='/images/Profile.png' alt='Profile-icon' />
                <span>Users</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 md:px-5 px-4  hover:text-gray-900 ">
                <img src='/images/Article.png' alt='Article-icon' />
                <span>Request</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 md:px-5 px-4  hover:text-gray-900 ">
                <img src='/images/Scroll.png' alt='Scroll-icon' />
                <span>Applications</span>
              </button>
              <div className='md:px-5 px-4 ' >
                <div className="relative ">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search listings, users here..."
                    className="bg-gray-50 text-gray-900 rounded-lg pl-10 pr-4 py-2 lg:w-80 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                  />
                </div>
              </div>

            </div>
)
}

// Mobile Navigation Menu
const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <img src='/images/logo.png' alt='logo' />
            <span className="font-semibold text-lg">myxellia</span>
          </div>
          <button onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
     <div className="block md:hidden">
   <Nav />
</div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const MyxelliaDashboard: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
          {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Header */}
      <header>
        {/* Top Dark Bar - Logo and Icons */}
        <div className="bg-[#191919] text-white px-10 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
                <img src='/images/logo.png' alt='logo' className="w-8 h-8" />
              </div>
              <span className="font-semibold text-lg">myxellia</span>
            </div>

            <div className="flex items-center space-x-4">
              <img src='/images/Notification.png' alt='notification' />
              <img src='/images/Budgeting.png' alt='Budgeting' />
              <img src='/images/Calendar.png' alt='Calender' />
              <img src='/images/message-notif.png' alt='message notification' />
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-semibold">D</span>
              </div>
            </div>

             {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom White Bar - Navigation and Search */}
        <div className="bg-white border-b border-gray-200 px-10 py-4">
          <div className="hidden md:flex items-center ">
            <Nav />


          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Welcome, Ahmed</h1>

        <div className="md:grid grid-cols-12 gap-6">
          {/* Sales Overview */}
          <div className="col-span-8">
            <div className="bg-white rounded-3xl border p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Sales Overview</h2>
                  <p className="text-sm text-gray-500 mt-1">Showing overview Jan 2022 - Sep 2022</p>
                </div>
                <div className="flex items-center">
                  <button className="px-6 py-3 border-[#D6D6D6]  border text-sm font-medium text-gray-700 rounded-3xl hover:bg-gray-200">
                    View Transactions
                  </button>
                </div>
              </div>

              {/* Time Period Buttons */}
              <div className="flex items-center md:justify-end space-x-6 mb-6">
                <button className="text-sm font-medium text-gray-500 hover:text-gray-700 py-2  border-transparent">
                  1 Week
                </button>
                <button className="text-sm font-medium text-gray-500 hover:text-gray-700 py-2  border-transparent">
                  1 Month
                </button>
                <button className="text-sm font-medium px-4 text-black py-2 rounded-lg bg-[#F5F5F5]">
                  1 Year
                </button>
              </div>

              {/* Horizontal separator line */}
              <div className="border-t border-gray-200 mb-6"></div>

              <div className="xl:grid grid-cols-4 gap-6">
                {/* Chart Section - Takes 2/3 of the width */}
                <div className="col-span-2">
                  <SalesChart />
                </div>

                {/* Metrics Section - Takes 1/3 of the width in 2x2 grid */}
                <div className="col-span-2 lg:mt-0 mt-6">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Top Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <MetricCard
                        title="Total Inflow"
                        value="₦120,000,000.00"
                        change="2.5%"
                        isPositive={true}
                        color="blue"
                      />
                      <MetricCard
                        title="MRR"
                        value="₦50,000,000.00"
                        change="2.5%"
                        isPositive={true}
                        color="green"
                      />
                    </div>
                    {/* Bottom Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <MetricCard
                        title="Commission Revenue"
                        value="₦200,000,000.00"
                        change="0.5%"
                        isPositive={true}
                        color="teal"
                      />
                      <MetricCard
                        title="GMV"
                        value="₦100,000,000.00"
                        change="0.5%"
                        isPositive={false}
                        color="red"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6 lg:mt-0 mt-6">
            <OverviewCard
              title="Listings Overview"
              total="1.8k"
              active="80"
              archived="1k"
              image='/images/solar_home.png'
            />

            <OverviewCard
              title="Users Overview"
              total="20.7k"
              active="8.5k"
              archived="7.5k"
              riders="8.5k"
              subscribers="7.5k"
              image='/images/profile_blue.png'
            />
          </div>

          {/* Property Cards */}
          <div className="col-span-12 lg:mt-0 mt-16">
            <div className="md:grid grid-cols-3 gap-6 md:space-y-0 space-y-7">
              <PropertyCard
                label="MOST CLICKED"
                title="Urban Prime Plaza Premiere"
                image="/images/img1.jpg"
                index={0}
              />
              <PropertyCard
                label="MOST WATCHLISTED"
                title="Urban Prime Plaza Premiere"
                image="/images/img2.png"
                index={1}
              />
              <PropertyCard
                label="HOTTEST LISTING"
                title="Urban Prime Plaza Premiere"
                image="/images/img3.png"
                index={2}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyxelliaDashboard;