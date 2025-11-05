const OrderStatuses = {
  PENDING: 0,
  CONFIRMED: 1,
  DONE: 2,
  CANCELLED: 3,

  title: function(status) {
    switch(status)
    {
      case OrderStatuses.PENDING:
        return 'Pending';
      case OrderStatuses.CONFIRMED:
        return 'Confirmed';
      case OrderStatuses.DONE:
        return 'Completed';
      case OrderStatuses.CANCELLED:
        return 'Cancelled';
    }
  },
};

export default OrderStatuses;

