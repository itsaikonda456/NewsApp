import './App.css';
import Navbar from './Components/Navbar';
import React, { useState } from 'react';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App =(props)=> {
 const [progress,setprogress] = useState(0)

 

    return (
      <div>
        <Router> 
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={progress}
         />
          <Routes>
            <Route path="/" element={<News articles={props.articles} setprogress={setprogress} key="home" pageSizes={6} country='in' category='General'  />} />
            <Route path="/business" element={<News setprogress={setprogress} key="business" pageSizes={6} country='in' category='Business'  />} />
            <Route path="/health" element={<News setprogress={setprogress} key="health" pageSizes={6} country='in' category='Health'  />} />
            <Route path="/entertainment" element={<News setprogress={setprogress} key="entertainment" pageSizes={6} country='in' category='Entertainment'  />} />
            <Route path="/general" element={<News setprogress={setprogress} key="general" pageSizes={6} country='in' category='General'  />} />
            <Route path="/science" element={<News setprogress={setprogress} key="science" pageSizes={6} country='in' category='Science'  />} />
            <Route path="/sports" element={<News setprogress={setprogress} key="sports" pageSizes={6} country='in' category='Sports'  />} />
            <Route path="/technology" element={<News setprogress={setprogress} key="technology" pageSizes={6} country='in' category='Technology'  />} />
          </Routes>
        </Router>
      </div>
    );
  }

export default App;