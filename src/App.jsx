import BlogList from "./component/blog/BlogList";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogDetail from "./component/blog/BlogDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
