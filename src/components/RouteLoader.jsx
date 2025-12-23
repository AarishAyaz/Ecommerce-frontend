import { useNavigation } from "react-router-dom";
import PageLoader from "./PageLoader";

const RouteLoader = () => {
  const navigation = useNavigation();
  return navigation.state === "loading" ? <PageLoader /> : null;
};

export default RouteLoader;
