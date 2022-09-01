import React from 'react'
import { LineChart } from "../charts/LineChart";

const PortfolioCharts = () => {
  return (
    <>
    <div className='position-relative'>
              <div >
              <h2>Portfolio Value:
                  <br />
                  $88,888
                </h2>
              </div>
              <div className="position-absolute top-0 end-0">
                <div className="d-flex h-100 p-1">
                  <div className="card mx-1">
                    <div className="card-body">
                      <h5 className="card-title">5%</h5>
                      <h6 className='card-subtitle text-muted'>Ann. Return</h6>
                    </div>
                  </div>
                  <div className="card mx-1">
                    <div className="card-body">
                      <h5 className="card-title">5%</h5>
                      <h6 className='card-subtitle text-muted'>Net. Return</h6>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
            <div className="row">
              <div className="col">
              <LineChart 
              dynamicWidth={true}
              ticker="spy"
              displayDiff={false}
                margin={{right:50,left:50,bottom:50,top:60}}
                lineWidth='3px'
                width={1200}
               endDate={new Date()} startDate={new Date(new Date().setFullYear(new Date().getFullYear()-1))}/>

              </div>
            </div>
            </>
  )
}

export default PortfolioCharts