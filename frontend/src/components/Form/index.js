import styled from 'styled-components';

export const FormWrapper = styled.div`
  background: #fff;
  border-radius: 4px;

  margin: 34px auto;
  padding: 0 30px;
  width: 100%;
  max-width: 1600px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 28px 30px;

    label {
      display: block;
      text-align: left;
      margin-bottom: 15px;

      color: #444;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;

      width: 100%;

      & > input {
        display: block;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #999;
        font-size: 16px;
        margin-top: 9px;
        padding: 12px 15px;
        width: 100%;

        &::placeholder {
          color: #999;
        }
      }

      span.error {
        font-size: 10px;
        color: #de3b3b;
      }
    }
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns};
  grid-gap: ${props => props.gridGap};
  width: 100%;
`;
