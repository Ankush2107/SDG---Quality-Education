import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => (
  <div className="dashboard-layout">
    <Sidebar />
    <main className="dashboard-main">
      {children}
    </main>
  </div>
)

export default DashboardLayout
