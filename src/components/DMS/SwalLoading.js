import Swal from "sweetalert2";

function SwalLoading() {
  function startLoading() {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: true,
      allowEscapeKey: true,
    });
    Swal.showLoading();
  }

  function stopLoading() {
    Swal.close();
  }
  return { startLoading, stopLoading };
}

export default SwalLoading;
