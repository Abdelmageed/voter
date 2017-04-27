import {connect} from 'react-redux';

import Poll from '../components/Poll';

const mapStateToProps = (state) => ({
    ip: state.user.ip
});

export default connect(mapStateToProps) (Poll);