import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import { render } from "react-dom";

import DownloadPage from './DownloadPage'
import RotatePage from './RotatePage'
import AddPage from './AddPage'
import LayoutFlow from './LayoutPage.jsx'
import NodeAsHandleFlow from './FloatingPage'

import Logo from '../dist/assets/logo.jsx'

import './App.css'

export default function App() {
  	return (
    	<Router>
      		<div style={{ height: '100%', }}>
        		<nav>
          			<ul>
                  <li>
                    <Logo/>
            			</li>
            			<li>
              				<Link to="/">Скачивание</Link>
            			</li>
            			<li>
              				<Link to="/rotate">Вращение</Link>
            			</li>
                  <li>
              				<Link to="/add">Добавление</Link>
            			</li>
                  <li>
              				<Link to="/layout">Древо</Link>
            			</li>
                  <li>
              				<Link to="/float">Float</Link>
            			</li>
          			</ul>
        		</nav>

        		<Routes>
                <Route path="/float" element={<NodeAsHandleFlow />} />
                <Route path="/layout" element={<LayoutFlow />} />
                <Route path="/add" element={<AddPage />} />
          			<Route path="/rotate" element={<RotatePage />} />
          			<Route path="/" element={<DownloadPage />} />
        		</Routes>
      		</div>
    	</Router>
  	);
}

StyleSheet
// import your route components too

// render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route index element={<Home />} />
//         <Route path="teams" element={<Teams />}>
//           <Route path=":teamId" element={<Team />} />
//           <Route path="new" element={<NewTeamForm />} />
//           <Route index element={<LeagueStandings />} />
//         </Route>
//       </Route>
//     </Routes>
//   </BrowserRouter>,
//   document.getElementById("root")
// );