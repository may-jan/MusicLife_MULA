import Swal from "sweetalert2";

const askAlert = async (text) => {
  const res = await Swal.fire({
    html: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "예",
    confirmButtonColor: "#69cbd7",
    cancelButtonText: "아니오",
    cancelButtonColor: "#888888",
    denyButtonColor: "#69cbd7",
    backdrop: `rgba(0,0,0,0.6)`,
  });
  return res.isConfirmed;
};

export default askAlert;
