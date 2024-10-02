import Swal from 'sweetalert2'

export function show_alert(message, icon, focus) {
    if (focus !== '') {
        nextTick(() => focus.value.focus)
    }
    Swal.fire({
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            toast.style.zIndex = '100000';
        },
        position: 'top-right',
        customClass: {
            container: 'swal2-container'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: icon,
        title: message,
        toast: true,
    })
}