import { render, fireEvent } from 'react-native-testing-library';
import Map from '../Map';

test('Input Change Test', () => {
  const { getByPlaceholder} = render(<Map />);
  const input = getByPlaceholder('Enter IP Address')

  // Change the input value
  fireEvent.changeText(input, '154.160.14.194');

  // Verify that the input value has been updated
  expect(input.props.value).toBe('154.160.14.194');
});