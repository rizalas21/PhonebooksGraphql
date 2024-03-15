import { useState } from "react";
import ContactBar from "./ContactBar";
import ContactList from "./ContactList";

export default function ContactBox() {
  const [filter, setFilter] = useState({ sort: "asc", keyword: "" });

  return (
    <div className="container-box">
      <ContactBar filter={filter} setFilter={setFilter} />
      <ContactList filter={filter} />
    </div>
  );
}
