import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import './style2.css';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
      if (this.state[menuState]) {
          this.setState({
              [menuState]: false
          });
      } else if (Object.keys(this.state).length === 0) {
          this.setState({
              [menuState]: true
          });
      } else {
          Object.keys(this.state).forEach(i => {
              this.setState({
                  [i]: false
              });
          });
          this.setState({
              [menuState]: true
          });
      }
  }

  componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
          this.onRouteChanged();
      }
  }

  onRouteChanged() {
      document.querySelector('#sidebar').classList.remove('active');
      Object.keys(this.state).forEach(i => {
          this.setState({
              [i]: false
          });
      });

    const dropdownPaths = [{
                path: '/apps',
                state: 'appsMenuOpen'
            },
            {
                path: '/super-admin',
                state: 'superAdminOpen'
            },
            {
                path: '/pos',
                state: 'posOpen'
            },
            {
                path: '/catalogue',
                state: 'superAdminCatalogueOpen'
            },
            {
                path: '/waste',
                state: 'wasteOpen'
        },
        {
            path: '/booking',
            state: 'bookingOpen'
        },
    ];

      dropdownPaths.forEach((obj => {
          if (this.isPathActive(obj.path)) {
              this.setState({
                  [obj.state]: true
              })
          }
      }));

  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <img className="logo" src={ require('../../assets/images/logo.png') } alt=""></img>
          <p className="company_name">
              <span className="res">Restaurant</span> FOOD</p>
      </div>
      <ul className="nav">
          <li className="nav-item nav-category">
              <span className="nav-link">Navigation Options</span>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
              <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title">
                  <Trans>Dashboard</Trans>
              </span>
              </Link>
          </li>
          <li className={ this.isPathActive('/super-admin') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
              <div className={ this.state.superAdminOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ ()=>
                  this.toggleMenuState('superAdminOpen') } data-toggle="collapse">
                  <span className="menu-icon">
                      <i className="mdi mdi-laptop"></i>
                  </span>
                  <span className="menu-title">
                      <Trans>Admin Management</Trans>
                  </span>
                  <i className="menu-arrow"></i>
              </div>
              <Collapse in={ this.state.superAdminOpen }>
                  <div>
                      <ul className="nav flex-column sub-menu">
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/super-admin/super-admin') ? 'nav-link active'
                                  : 'nav-link' } to="/super-admin/super-admin">
                              <Trans>Super Admin</Trans>
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/super-admin/admin') ? 'nav-link active' : 'nav-link' }
                                  to="/super-admin/admin">
                              <Trans>Admin</Trans>
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/super-admin/sub-admin') ? 'nav-link active'
                                  : 'nav-link' } to="/super-admin/sub-admin">
                              <Trans>Sub-Admin</Trans>
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/super-admin/all-admin') ? 'nav-link active'
                                  : 'nav-link' } to="/super-admin/all-admin">
                              <Trans>All</Trans>
                              </Link>
                          </li>
                      </ul>
                  </div>
              </Collapse>
          </li>
          <li className={ this.isPathActive('/pos') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
              <div className={ this.state.posOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ ()=>
                  this.toggleMenuState('posOpen') } data-toggle="collapse">
                  <span className="menu-icon">
                      <i className="mdi mdi-playlist-play"></i>
                  </span>
                  <span className="menu-title">
                      <Trans>POS Management</Trans>
                  </span>
                  <i className="menu-arrow"></i>
              </div>
              <Collapse in={ this.state.posOpen }>
                  <div>
                      <ul className="nav flex-column sub-menu">
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/pos/quick-order') ? 'nav-link active' : 'nav-link' }
                                  to="/pos/quick-order">
                              <Trans>Quick Order</Trans>
                              </Link>
                          </li>
                      </ul>
                  </div>
              </Collapse>
          </li>
          <li className={ this.isPathActive('/catalogue') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
              <div className={ this.state.superAdminCatalogueOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ ()=>
                  this.toggleMenuState('superAdminCatalogueOpen') } data-toggle="collapse">
                  <span className="menu-icon">
                      <i className="mdi mdi-table-large"></i>
                  </span>
                  <span className="menu-title">
                      <Trans>Catelogue <br /> Management</Trans>
                  </span>
                  <i className="menu-arrow"></i>
              </div>
              <Collapse in={ this.state.superAdminCatalogueOpen }>
                  <div>
                      <ul className="nav flex-column sub-menu">
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/catalogue/section') ? 'nav-link active' : 'nav-link' }
                                  to="/catalogue/section">
                              <Trans>Section</Trans>
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/catalogue/category') ? 'nav-link active' : 'nav-link'
                                  } to="/catalogue/category">
                              <Trans>Category</Trans>
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/catalogue/brand') ? 'nav-link active' : 'nav-link' }
                                  to="/catalogue/brand">
                              <Trans>Brand</Trans>
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className={ this.isPathActive('/catalogue/food') ? 'nav-link active' : 'nav-link' }
                                  to="/catalogue/food">
                              <Trans>Food item</Trans>
                              </Link>
                          </li>
                      </ul>
                  </div>
              </Collapse>
           </li>
           <li className={ this.isPathActive('/waste') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
           <div className={ this.state.wasteOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('wasteOpen') } data-toggle="collapse">
             <span className="menu-icon">
               <i className="mdi mdi-security"></i>
             </span>
             <span className="menu-title"><Trans>Waste Management</Trans></span>
             <i className="menu-arrow"></i>
           </div>
           <Collapse in={ this.state.wasteOpen }>
             <div>
               <ul className="nav flex-column sub-menu">
                 <li className="nav-item"> <Link className={ this.isPathActive('/waste') ? 'nav-link active' : 'nav-link' } to="/waste"><Trans>All waste</Trans></Link></li>
                 <li className="nav-item"> <Link className={ this.isPathActive('/waste/new-waste') ? 'nav-link active' : 'nav-link' } to="/waste/new-waste"><Trans>New Waste</Trans></Link></li>
               </ul>
             </div>
           </Collapse>
           </li>
                <li className={ this.isPathActive('/booking') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
                <div className={ this.state.bookingOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('bookingOpen') } data-toggle="collapse">
                  <span className="menu-icon">
                    <i className="mdi mdi-contacts"></i>
                  </span>
                  <span className="menu-title"><Trans>Booking/Reservation</Trans></span>
                  <i className="menu-arrow"></i>
                </div>
                <Collapse in={ this.state.bookingOpen }>
                  <div>
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <Link className={ this.isPathActive('/booking') ? 'nav-link active' : 'nav-link' } to="/booking"><Trans>Booking</Trans></Link></li>
                      <li className="nav-item"> <Link className={ this.isPathActive('/booking/new-booking') ? 'nav-link active' : 'nav-link' } to="/booking/new-booking"><Trans>New Booking</Trans></Link></li>
                    </ul>
                  </div>
                </Collapse>
              </li>
      </ul>
  </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);