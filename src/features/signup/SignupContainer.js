import Signup from '../../components/signup/Signup'
import { useNavigate } from 'react-router-dom';
import { join } from '../../api/users'

export default function SignupContainer() {
    const navigate = useNavigate();

    const onSubmit = (parm) => {
        join(parm)
            .then((reponse) => {
                alert('회원가입 되었습니다.')
                navigate("/loin")
            })
            .catch(err => {
                console.log(err);
                if (err?.response?.data?.message) {
                    alert(err?.response.data.message)
                }
            })
    }

    return (<Signup onSubmit={onSubmit} ></Signup>
    )
}