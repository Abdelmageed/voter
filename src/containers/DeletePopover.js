import {connect} from 'react-redux';

import DeletePopover from '../components/DeletePopover';
import {removePoll} from '../actions/actionCreators';

const mapDispatchToProps = (dispatch, ownProps) => ({
    delete: () => {dispatch(removePoll(ownProps.id));}
});

export default connect(null, mapDispatchToProps)(DeletePopover);