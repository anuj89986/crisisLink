import Sidebar from '../components/Sidebar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout