import Breadcrumb from 'react-bootstrap/Breadcrumb';

const CustomBreadcrumbs=()=>{
  return (
    <Breadcrumb className='bg-dark p-1'>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default CustomBreadcrumbs;