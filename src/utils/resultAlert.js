import Swal from 'sweetalert2';

const resultAlert = async (text, icon) => {
  return Swal.fire({
    text: text,
    icon: icon,
    confirmButtonColor: '#69cbd7',
  });
};

export default resultAlert;
