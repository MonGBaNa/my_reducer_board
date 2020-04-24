import React from 'react';
import { connect } from 'react-redux';
import InputWithLabel from '../AuthComponents/InputWithLabel';

const Test = ({state}) => {
    return (
        <>
            <InputWithLabel label={"닉네임"} condition={"( 공백없이 4 ~ 16자 사이로 입력해주세요 )"} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {state}
}

// const mapDispatchToProps = (dispatch) => {
//     return {
        
//     }
// }

export default connect(mapStateToProps,null)(Test);