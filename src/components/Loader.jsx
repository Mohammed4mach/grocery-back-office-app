import Modal from './Modal';
import { useLoader } from '@/contexts/loaderContext';

const Loader = (props) =>
{
  let {className} = props;
  className = className ?? '';

  const { shown } = useLoader();

  return (
    <Modal className="loader" shown={shown} hideClose={true} noClose>
      <section className="flex-center">
        <div className="modal-loader"></div>
      </section>
    </Modal>
  );
}

export default Loader;

