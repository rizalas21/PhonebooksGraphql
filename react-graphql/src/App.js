import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactBox from "./component/ContactBox";
import AddContact from "./component/AddContact";
import UpdateAvatar from "./component/UpdateAvatar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactBox />} />
        <Route path="/Add" element={<AddContact />} />
        <Route path="/Avatar" element={<UpdateAvatar />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );

  function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }
}
