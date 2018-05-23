import { connect } from "utils/mobx";
import Workbench from "./Workbench";

const App = connect(state => state.workbench)(Workbench);

export default App;
