import './App.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function App() {
  const [searchText, setSearchText] = useState("");
  const [resArr, setResArr] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searched, setSearched] = useState(false)


  var btnClose = document.getElementById('close-btn');

  function handleSearch(e) {
    setSearchText(e.target.value);
    if (e.target.value !== 0 || e.target.value !== "") {
      btnClose.style.visibility = "visible";
    } else {
      btnClose.style.visibility = "hidden";
    }
  }


  function handleCloseBtn() {
    setSearchText("");
    btnClose.style.visibility = "hidden";
  }

  function handleSearchBtn() {
    if (searchText.length != 0 && searchText != "") {
      console.log("fetch data")
    }
  }

  const skls = []
  for (var i = 0; i < 7; i++) {
    skls.push(<div className='grid'>
      <Skeleton animation="wave" style={{ width: "100px" }} />
      <Skeleton animation="wave" style={{ width: "200px" }} />
      <Skeleton animation="wave" style={{ width: "500px" }} />
      <Skeleton animation="wave" style={{ width: "150px" }} />
    </div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <div className="logo-box">لوگو</div>
          <div className="search-div">
            <div className="search-box">
              <div className="search-btn"><IconButton color="secondary" aria-label="add an alarm" onClick={handleSearchBtn}><SearchIcon /></IconButton></div>
              <input type="text" placeholder="جستجو" className="search-in" id="search-in" onChange={e => handleSearch(e)} value={searchText} />
              <div className="search-btn close-btn" id="close-btn" onClick={handleCloseBtn}><IconButton color="secondary" aria-label="add an alarm"><CloseIcon /></IconButton></div>
            </div>
          </div>
        </div>
      </header>
      <section className="result">
        <section className='vision'>
          {loading ? <div>
            <Skeleton animation="wave" className='statistic-skel' />
          </div> : null}
          {loading || error || !searched ? null : <span className='statistic'>حدود 500 نتیجه در 0.1 ثانیه</span>}
        </section>
        {/* {
          resArr.map((v,k) => {
            return v
          })
        } */}
        {loading ? <div className='skeleton-div'>
          {skls}
        </div> : null}
        {loading ? null : resArr.map((v, k) => {
          return
          <div className="grid">
            <div className='grid-url'>google.com</div>
            <div className="grid-title"><a href="google.com" className='url'>تستچی: سامانه آنلاین انواع تست</a></div>
            <div className="grid-summary">کامل ترین مرجع ساخت و انجام انواع تست و کوییز آنلاین، تست شخصیت شناسی، طرفداری، داستانی،سرگرمی، هوش به زبان فارسی</div>
          </div>
        })}
      </section>
      <footer className='footer'>
        <ul className='footer-ul'>
          <li className='footer-li'>
            <a className='footer-a' href='#'>
              ارتباط با ما
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
