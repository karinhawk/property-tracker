// import AddPropertyForm from "./AddPropertyForm"
// import { render, screen } from "@testing-library/react";
// import { AuthAndDBProvider, useAppContext, AppContext } from "../../AppContext"
// import { HashRouter } from 'react-router-dom';
// import { useContext } from "react";


// const CustomTest = () => {
//   const { addProperty, uploadImage } = useContext(AppContext)
//   return (
//     <AddPropertyForm  addProperty={addProperty} uploadImage={uploadImage}/>
//   )
// }

// beforeEach(() => {
//   jest.resetModules();
// });

// test("Should render the labels", () => {
  
//   render(
//     <HashRouter>
//     <AuthAndDBProvider>
//       <CustomTest />
//     </AuthAndDBProvider>
//     </HashRouter>
//   );

//   const label = screen.getByText("Street Name")
//   expect(label).toBeTruthy()

// })