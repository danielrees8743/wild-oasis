import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDeleteBooking } from './useDeleteBooking';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckout } from '../check-in-out/useCheckout';
import { useBooking } from './useBooking';
import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { isCheckingOut, checkout } = useCheckout();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName={'booking'} />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}>
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete booking</Button>
          </Modal.Open>
          <Modal.Window name='delete' title='Delete Booking'>
            <ConfirmDelete
              disabled={isDeleting}
              resourceName='booking'
              onConfirm={() => {
                deleteBooking(bookingId);
              }}
            />
          </Modal.Window>
        </Modal>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
