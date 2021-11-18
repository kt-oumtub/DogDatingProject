import {StyleSheet} from 'react-native';

const MAIN_APP_COLOR1 = ['#FF6C6C', '#FF8976', '#FFDB93'];
const MAIN_APP_COLOR2 = ['#FF6C6C', '#FFDB93'];
const PRIMARY_COLOR = '#7444C0';
const SECONDARY_COLOR = '#5636B8';
const WHITE = '#FFFFFF';
const GRAY = '#757E90';
const DARK_GRAY = '#363636';
const BLACK = '#000000';
const ONLINE_STATUS = '#46A575';
const OFFLINE_STATUS = '#D04949';
const STAR_ACTIONS = '#FFA200';
const LIKE_ACTIONS = '#B644B2';
const DISLIKE_ACTIONS = '#363636';
const FLASH_ACTIONS = '#5028D7';
const FONT_HEADER = '#FF3939';

module.exports = StyleSheet.create({
  headerField: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    padding: 6,
    paddingLeft: 14,
    backgroundColor: WHITE,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },

  headerFont: {
    fontSize: 26,
    fontWeight: 'bold',
    color: FONT_HEADER,
  },

  col_10: {
    flexDirection: 'column',
    flex: 1,
  },
  col_20: {
    flexDirection: 'column',
    flex: 2,
  },
  col_30: {
    flexDirection: 'column',
    flex: 3,
  },
  col_40: {
    flexDirection: 'column',
    flex: 4,
  },
  col_60: {
    flexDirection: 'column',
    flex: 6,
  },
  col_70: {
    flexDirection: 'column',
    flex: 7,
  },
  col_80: {
    flexDirection: 'column',
    flex: 8,
  },
  col_90: {
    flexDirection: 'column',
    flex: 9,
  },
});
