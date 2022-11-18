import "antd/dist/antd.min.css";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import DataTable from "./components/DataTable";

// Background color based on the wefox website. I experimented a lot with the colors of the cards (posts),
// especially with golden colors, but non satisfied me. So I settled for a simple, default white.
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
