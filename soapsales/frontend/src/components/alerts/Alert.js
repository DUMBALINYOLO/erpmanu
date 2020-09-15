import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {

      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.rate) alert.error(`Rate: ${error.msg.rate.join()}`);
      if (error.msg.symbol) alert.error(`Symbol: ${error.msg.symbol.join()}`);
      if (error.msg.id) alert.error(`ID: ${error.msg.id.join()}`);
      if (error.msg.account_type) alert.error(`Accouttype: ${error.msg.account_type.join()}`);
      if (error.msg.description) alert.error(`Description: ${error.msg.description.join()}`);
      if (error.msg.initial_balance) alert.error(`Initial Balance: ${error.msg.initial_balance.join()}`);
      if (error.msg.is_active) alert.error(`Is Active: ${error.msg.is_active.join()}`);
      if (error.msg.is_contra) alert.error(`Is Contra: ${error.msg.is_contra.join()}`);
      if (error.msg.order) alert.error(`Order: ${error.msg.order.join()}`);
      if (error.msg.memo) alert.error(`Memo: ${error.msg.memo.join()}`);
      if (error.msg.vendor) alert.error(`Vendor: ${error.msg.vendor.join()}`);
      if (error.msg.date) alert.error(`Date: ${error.msg.date.join()}`);
      if (error.msg.due) alert.error(`Due: ${error.msg.due.join()}`);
      if (error.msg.debit_account) alert.error(`Debit-Account: ${error.msg.debit_account.join()}`);
      if (error.msg.amount) alert.error(`Amount: ${error.msg.amount.join()}`);
      if (error.msg.reference) alert.error(`Reference: ${error.msg.reference.join()}`);
      if (error.msg.pricing_method) alert.error(`Pricing-Method: ${error.msg.pricing_method.join()}`);
      if (error.msg.direct_price) alert.error(`DirectPrice: ${error.msg.direct_price.join()}`);
      if (error.msg.margin) alert.error(`Margin: ${error.msg.margin.join()}`);
      if (error.msg.markup) alert.error(`Markup: ${error.msg.markup.join()}`);
      if (error.msg.sku) alert.error(`SKU: ${error.msg.sku.join()}`);
      if (error.msg.quantity) alert.error(`Quantity: ${error.msg.quantity.join()}`);
      if (error.msg.product) alert.error(`Product: ${error.msg.product.join()}`);
      if (error.msg.review_needed) alert.error(`Reviewed-Needed: ${error.msg.review_needed.join()}`);
      if (error.msg.category) alert.error(`Category: ${error.msg.category.join()}`);
      if (error.msg.location) alert.error(`Location: ${error.msg.location.join()}`);
      if (error.msg.updated) alert.error(`Updated: ${error.msg.updated.join()}`);
      if (error.msg.status) alert.error(`Status: ${error.msg.status.join()}`);
      if (error.msg.notes) alert.error(`NOTES: ${error.msg.notes.join()}`);
      if (error.msg.product_component) alert.error(`PRODUCT-COMPONENT: ${error.msg.product_component.join()}`);
      if (error.msg.minimum_order_level) alert.error(`MANIMUM-ORDER-LEVEL: ${error.msg.minimum_order_level.join()}`);
      if (error.msg.maximum_stock_level) alert.error(`MAXIMUM-STOCK-LEVEL: ${error.msg.maximum_stock_leve.join()}`);
      if (error.msg.lines) alert.error(`LINES: ${error.msg.lines.join()}`);
      if (error.msg.items) alert.error(`ITEMS: ${error.msg.items.join()}`);
      if (error.msg.customer) alert.error(`CUSTOMER: ${error.msg.customer.join()}`);
      if (error.msg.purchase_order_number) alert.error(`PURCHASE-ORDER-NUMBER: ${error.msg.purchase_order_number.join()}`);
      if (error.msg.validated_by) alert.error(`INVOICE-VALIDATOR: ${error.msg.validated_by.join()}`);
      if (error.msg.draft) alert.error(`Draft: ${error.msg.draft.join()}`);
      if (error.msg.cashier) alert.error(`SALES PERSON: ${error.msg.cashier.join()}`);
      if (error.msg.terms) alert.error(`TERMS: ${error.msg.terms.join()}`);
      if (error.msg.comments) alert.error(`COMMENTS: ${error.msg.comments.join()}`);
      if (error.msg.ship_from) alert.error(`SHIP FROM: ${error.msg.ship_from.join()}`);
      if (error.msg.validated_by) alert.error(`VALIDATED BY: ${error.msg.validated_by.join()}`);
      if (error.msg.expected_receipt_date) alert.error(`EXPECTED DATE: ${error.msg.expected_receipt_date.join()}`);
      if (error.msg.supplier) alert.error(`SUPPLIER: ${error.msg.supplier.join()}`);
      if (error.msg.entries) alert.error(`ENTRIES: ${error.msg.entries.join()}`);
      if (error.msg.shipping_cost_entries) alert.error(`SHIPPING ENTRIES: ${error.msg.shipping_cost_entries.join()}`);
      if (error.msg.ship_to) alert.error(`SHIP TO: ${error.msg.ship_to.join()}`);
      // if (error.msg.notes) alert.error(`NOTES: ${error.msg.notes.join()}`);
      if (error.msg.issuing_inventory_controller) alert.error(`STAFF: ${error.msg.issuing_inventory_controller.join()}`);
      if (error.msg.tax) alert.error(`TAX: ${error.msg.tax.join()}`);

      if (error.msg.type) alert.error(`TYPE: ${error.msg.type.join()}`);
      if (error.msg.unit) alert.error(`UNIT: ${error.msg.unit.join()}`);
      if (error.msg.finished_goods) alert.error(`FINISHED GOODS: ${error.msg.finished_goods.join()}`);
      if (error.msg.inventory_product) alert.error(`INVENTORY PRODUCT: ${error.msg.inventory_product.join()}`);
      if (error.msg.product_list) alert.error(`PRODUCT LIST: ${error.msg.product_list.join()}`);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
    }

    if (message !== prevProps.message) {
      if (message.taxDeleted) alert.success(message.taxDeleted);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
