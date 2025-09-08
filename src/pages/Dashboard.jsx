import React, { useState } from "react";
import Button from "../components/common/Button";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Card from "../components/common/Card";

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
];

const data = [
  { id: 1, name: "Abdallah", email: "abd@example.com" },
  { id: 2, name: "Sara", email: "sara@example.com" },
  { id: 3, name: "Omar", email: "omar@example.com" },
];

export default function Dashboard() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>Dashboard</div>
      <br />
      <div>
        <Button onClick={() => alert("Primary clicked!")}>
          <i className="bi bi-1-circle-fill"></i> Primary Button
        </Button>
      </div>
      <br />
      <Table columns={columns} data={data} />
      <div>
        <Button onClick={() => setShow(true)}>Open Modal</Button>
        <Modal
          show={show}
          handleClose={() => setShow(false)}
          title="Custom Modal"
          footer={<Button onClick={() => setShow(false)}>Close</Button>}
        >
          <p>This is some content inside the modal!</p>
        </Modal>
      </div>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <Card title="User Info">
          <p>
            <strong>Name:</strong> Abdallah
          </p>
          <p>
            <strong>Email:</strong> abd@example.com
          </p>
        </Card>

        <Card title="Project Details" footer={<Button>View More</Button>}>
          <p>
            <strong>Project:</strong> Mini Dashboard
          </p>
          <p>
            <strong>Status:</strong> In Progress 🚀
          </p>
        </Card>
      </div>
    </>
  );
}
