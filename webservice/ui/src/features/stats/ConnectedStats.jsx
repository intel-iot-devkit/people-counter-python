import { connect } from "react-redux";
import Stats from "./Stats";
import { toggleTotalCount } from "../../dux/stats";

// maps the redux state to this components props
const mapStateToProps = state => ( {
  statsOn: state.stats.statsOn,
  totalCountOn: state.stats.totalCountOn,
} );

// provide the component with the dispatch method
const mapDispatchToProps = dispatch => ( {
  toggleTotalCount: () => {
    dispatch( toggleTotalCount() );
  },
} );

export default connect( mapStateToProps, mapDispatchToProps )( Stats );
