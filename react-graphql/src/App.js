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
      </Routes>
    </BrowserRouter>
  );
}
