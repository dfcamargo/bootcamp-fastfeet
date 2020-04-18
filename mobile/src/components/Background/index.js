import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  start: { x: 0, y: 0.25 },
  end: { x: 0, y: 1.0 },
  locations: [0, 0],
  colors: ['#7d40e7', '#fff'],
})`
  flex: 1;
`;
