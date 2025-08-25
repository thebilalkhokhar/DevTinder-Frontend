// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect, useState } from "react";

// const Premium = () => {
//   const [isUserPremium, setIsUserPremium] = useState(false);
//   const verifyPremium = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/payment/verify", {
//         withCredentials: true,
//       });
//       if (res.data.isPremium) {
//         setIsUserPremium(true);
//       }
//     } catch (error) {
//       console.error("Error verifying premium:", error);
//     }
//   };

//   useEffect(() => {
//     verifyPremium();
//   }, []);

//   const handlePaymentButton = async (type) => {
//     try {
//       const order = await axios.post(
//         BASE_URL + "/payment/create",
//         { membershipType: type },
//         { withCredentials: true }
//       );
//       const { keyId, amount, orderId, notes, currency } = order.data;

//       var options = {
//         key: keyId,
//         amount: amount,
//         currency: currency,
//         name: "DevTinder",
//         description: "DevTinder Premium Membership",
//         order_id: orderId,
//         prefill: {
//           name: notes.firstName + " " + notes.lastName,
//           email: notes.email,
//           contact: "+919876543210",
//         },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       var rzp1 = new window.Razorpay(options);
//       document.getElementById("rzp-button1").onclick = function (e) {
//         rzp1.open();
//         e.preventDefault();
//       };
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//   };

//   return isUserPremium ? (
//     <div>
//       <h1>You are a premium user</h1>
//     </div>
//   ) : (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-100">
//       <h1 className="text-3xl font-bold mb-8">Choose Your Membership</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
//         {/* Silver Membership */}
//         <div className="card shadow-xl bg-base-200">
//           <div className="card-body items-center text-center">
//             <h2 className="card-title">Silver Membership</h2>
//             <p className="text-2xl font-bold">$9.99 / month</p>
//             <ul className="list-disc list-inside text-left mt-4">
//               <li>Access to community</li>
//               <li>Basic live chat</li>
//               <li>Limited profile views</li>
//             </ul>
//             <div className="card-actions mt-6">
//               <button
//                 className="btn btn-outline"
//                 onClick={() => handlePaymentButton("silver")}
//               >
//                 Get Silver
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Gold Membership */}
//         <div className="card shadow-xl bg-base-300">
//           <div className="card-body items-center text-center">
//             <h2 className="card-title">Gold Membership</h2>
//             <p className="text-2xl font-bold">$19.99 / month</p>
//             <ul className="list-disc list-inside text-left mt-4">
//               <li>Everything in Silver</li>
//               <li>Unlimited chat & connections</li>
//               <li>Priority profile visibility</li>
//               <li>Exclusive Dev Events</li>
//             </ul>
//             <div className="card-actions mt-6">
//               <button
//                 className="btn btn-warning text-black"
//                 onClick={() => handlePaymentButton("gold")}
//               >
//                 Go Gold 🚀
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Premium;
