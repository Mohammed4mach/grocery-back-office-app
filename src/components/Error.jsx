import Modal from './Modal';

const Error = (props) =>
{
  let {className} = props;
  className = className ?? '';

  return (
    <Modal hideClose={true} persist>
      <section className="flex-center">
        <div className="modal-loader"></div>
      </section>
    </Modal>
  );
}

export default Error;

