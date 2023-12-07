import React, { useEffect, useState } from "react";
import axios from "axios";

export const FoundsTable = () => {
  const [foundsData, setFoundsData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/found")
      .then((response) => {
        setFoundsData(response.data);
        console.log("data", foundsData);
        console.log("datadetails", foundsData.username);
      })
      .catch((error) => {
        console.error("Error fetching users data ", error);
      });
  }, []);

  const handleDeleteFounds = (id) => {
    // Make a request to delete the user
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        console.log("Server response after deletion:", response);

        setFoundsData((prevFoundsData) =>
          prevFoundsData.filter((founds) => user.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting user ", error);
      });
  };

  const handlePublishFound = async (id) => {
    try {
      // Check if the found item exists
      const foundExists = foundsData.some((founds) => founds.id === id);
  
      if (!foundExists) {
        // endpoint for updating the status of a post
        const publishEndpoint = `http://localhost:3000/founds/${id}`;
        await axios.patch(publishEndpoint, { status: true });
  
        // Update the local state to reflect the change
        setFoundsData((prevFoundsData) =>
          prevFoundsData.map((founds) =>
            founds.id === id ? { ...founds, status: true } : founds
          )
        );
  
        console.log("Post published successfully");
      } else {
        console.log("Found item already exists");
      }
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };
  
  

  return (
    <>
      <div class="flex flex-col w-auto">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden  rounded-[1rem]">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      No.
                    </th>
                    {/* <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      User ID
                    </th> */}
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      User 
                    </th>
                    {/* <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th> */}
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Tite
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Found at
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Published at
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(foundsData) &&
                    foundsData.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white border-b"
                            : "bg-gray-100 border-b"
                        }
                      >
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.id}
                        </td>
                        {/* <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.user_id}
                        </td> */}
                        <td class="flex flex-col text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <span>{item.id_user}</span>
                          <span>{item.username}</span>
                          <span>{item.email}</span>
                          
                        </td>
                        {/* <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td> */}
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.title}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.category}
                        </td>
                        <td class="flex flex-col text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span> {item.city}</span>
                          <span>{item.date_found}</span>
                        
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.created_at}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                          <img src={item.imageurl} alt="" />
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-4">
                        <button
  onClick={(e) => handlePublishFound(item.id)}
  className={`px-[1rem] pb-2 text-xs font-semibold rounded-[0.65rem] text-xs px-5 py-2 ${
    foundsData.some((founds) => founds.id === item.id)
      ? "text-gray-500 cursor-not-allowed" // Found item exists, non-clickable and grey color
      : "text-[#18E074] border-2 border-[#18E074] hover:bg-[#18E074] hover:text-[#FFFFFF] focus:outline-none"
  }`}
>
  Approve
</button>



                          <button
                            onClick={(e) => handleDeleteFounds(item.id)}
                            class="px-[1.5rem] pb-2 text-[#E83434] bg-transparent border border-2 border-[#E83434]  focus:outline-none hover:bg-[#E83434] hover:text-[#FFFFFF] text-xs font-semibold rounded-[0.65rem] text-xs px-5 py-2 "
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
