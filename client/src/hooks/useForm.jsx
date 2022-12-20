import * as yup from 'yup';

//회원가입, 내정보관리
const formSchema = yup.object({
    email: yup
        .string()
        .required('이메일을 입력해주세요')
        .email('이메일 형식이 아닙니다.'),
    oldpassword: yup
        .string(),
    password: yup
        .string()
        .required('영문, 숫자, 특수문자를 포함해서 입력해주세요.')
        .min(8, '최소 8자 이상 가능합니다')
        .max(15, '최대 15자 까지만 가능합니다')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!^%*#?&]{8,15}$/,
            '영문, 숫자, 특수문자를 포함하여 입력해주세요.',
        ),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
    name: yup
        .string('문자를 입력해주세요')
        .required('이름을 입력해주세요')
        .min(2, '최소 2자 이상 가능합니다')
        .max(15, '최대 15자까지 가능합니다'),
    phoneNum: yup
        .string()
        .matches(/^[0-9]+$/, '숫자만 입력주세요')
        .min(5, '5자 이상의 전화번호를 입력해주세요')
        .max(15, '15자 미만의 전화번호를 입력해주세요'),
});

//로그인
const loginformSchema = yup.object({
    email: yup
        .string()
        .required('이메일을 입력해주세요')
        .email('이메일 형식이 아닙니다.'),
    password: yup.string().required('비밀번호를 입력해주세요'),
});

export {formSchema,loginformSchema};