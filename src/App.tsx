import "antd/dist/antd.min.css";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import DataTable from "./components/DataTable";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#301c4d",
      }}
    >
      <DataTable />
    </div>
  );
}

export default App;
