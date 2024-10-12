
import { lazy } from "react";
import { Navigate } from "react-router";

import Loadable from "src/layouts/full/shared/loadable/Loadable";
//form start
import AddServiceForm from "../views/MyWidgets/ashik/AddServiceForm";
import AddProviderForm from "src/views/MyWidgets/ashik/AddProviderForm";
import AddUserForm from "src/views/MyWidgets/ashik/AddUserForm";
import AddServicesLocationForm from "src/views/MyWidgets/ashik/AddServicesLocationForm";

import  ServiceCategory from  "../views/MyWidgets/ashik/ServiceCategory"
//formm end
//page start
import Home from "src/views/MyWidgets/ashik/Home";
import ServicesAll from "src/views/MyWidgets/ashik/ServicesAll";
import CommissionSetup from "src/views/MyWidgets/ashik/CommissionSetup";
import ProviderAll from "src/views/MyWidgets/ashik/ProviderAll";
import UserAll from "src/views/MyWidgets/ashik/UserAlll";
import ServicesLocationAll from "src/views/MyWidgets/ashik/ServicesLocationAll";
//page end

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));



const Router = [
    {
      path: '/',
      element: <FullLayout />,
      children: [
        { path: '/', element: <Navigate to="/admin" /> },
        { path: '/admin', exact: true, element: <ModernDash /> },
        //form
        { path: '/admin/addserviceform', element: <AddServiceForm /> },
        { path: '/admin/addproviderform', element: <AddProviderForm /> },
        { path: '/admin/adduserform', element: <AddUserForm /> },
        { path: '/admin/adduserform', element: <AddUserForm /> },
        { path: '/admin/addserviceslocationform', element: <AddServicesLocationForm /> },

        //page
        { path: '/admin/home', element: <Home /> },
        { path: '/admin/services/all', element: <ServicesAll /> },
        { path: '/admin/commissionsetup', element: <CommissionSetup /> },
        { path: '/admin/providers/all', element: <ProviderAll /> },
        { path: '/admin/user/all', element: <UserAll /> },
        { path: '/admin/serviceslocation/all', element: <ServicesLocationAll /> },
      ]
    }
  ]

export default Router;
