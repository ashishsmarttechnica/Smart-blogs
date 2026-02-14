import BlogList from "./component/blog/BlogList";
import { Routes, Route, HashRouter } from 'react-router-dom';
import BlogDetail from "./component/blog/BlogDetail";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </HashRouter>
  )
}

export default App
