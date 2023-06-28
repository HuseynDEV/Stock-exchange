import { AutoComplete } from "../components/AutoComplete"
import { StockList } from "../components/StockList"
import trading from "../images/Trading.png"
export const StockOverviewPage=()=>{
    return <div className="w-[80%] mx-auto"> 
         <div className="text-center  mx-auto w-full">
      <img src={trading} className="w-[400px] mx-auto " />
    </div>
        <AutoComplete/>
        <StockList/>
    </div>
}