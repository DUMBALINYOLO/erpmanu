import React, { Component } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export class DataTableCrudDemo extends Component {

    emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    constructor(props) {
        super(props);

        this.state = {
            products: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: this.emptyProduct,
            selectedProducts: null,
            submitted: false,
            globalFilter: null
        };

        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
        this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
    }

    componentDidMount() {

    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    openNew() {
        this.setState({
            product: this.emptyProduct,
            submitted: false,
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }

    hideDeleteProductsDialog() {
        this.setState({ deleteProductsDialog: false });
    }

    saveProduct() {
        let state = { submitted: true };

        if (this.state.product.name.trim()) {
            let products = [...this.state.products];
            let product = {...this.state.product};
            if (this.state.product.id) {
                const index = this.findIndexById(this.state.product.id);

                products[index] = product;
            }
            else {
                product.id = this.createId();
                product.image = 'product-placeholder.svg';
                products.push(product);
            }

            state = {
                ...state,
                products,
                productDialog: false,
                product: this.emptyProduct
            };
        }

        this.setState(state);
    }

    editProduct(product) {
        this.setState({
            product: { ...product },
            productDialog: true
        });
    }

    confirmDeleteProduct(product) {
        this.setState({
            product,
            deleteProductDialog: true
        });
    }

    deleteProduct() {
        let products = this.state.products.filter(val => val.id !== this.state.product.id);
        this.setState({
            products,
            deleteProductDialog: false,
            product: this.emptyProduct
        });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteProductsDialog: true });
    }

    deleteSelectedProducts() {
        let products = this.state.products.filter(val => !this.state.selectedProducts.includes(val));
        this.setState({
            products,
            deleteProductsDialog: false,
            selectedProducts: null
        });
    }

    onCategoryChange(e) {
        let product = {...this.state.product};
        product['category'] = e.value;
        this.setState({ product });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let product = {...this.state.product};
        product[`${name}`] = val;

        this.setState({ product });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let product = {...this.state.product};
        product[`${name}`] = val;

        this.setState({ product });
    }

    leftToolbarTemplate() {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProducts || !this.state.selectedProducts.length} />
            </>
        )
    }

    rightToolbarTemplate() {
        return (
            <>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </>
        )
    }

    imageBodyTemplate(rowData) {
        return <img src={`showcase/demo/images/product/${rowData.image}`} alt={rowData.image} className="product-image" />
    }

    priceBodyTemplate(rowData) {
        return this.formatCurrency(rowData.price);
    }

    ratingBodyTemplate(rowData) {
        return <Rating value={rowData.rating} readonly cancel={false} />;
    }

    statusBodyTemplate(rowData) {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProduct(rowData)} />
            </>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-m-0">Manage Products</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const productDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
            </>
        );
        const deleteProductDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </>
        );
        const deleteProductsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProducts} />
            </>
        );

        return (
            <div className="datatable-crud-demo">

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.products} selection={this.state.selectedProducts} onSelectionChange={(e) => this.setState({ selectedProducts: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={this.state.globalFilter}
                        header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="code" header="Code" sortable></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column header="Image" body={this.imageBodyTemplate}></Column>
                        <Column field="price" header="Price" body={this.priceBodyTemplate} sortable></Column>
                        <Column field="category" header="Category" sortable></Column>
                        <Column field="rating" header="Reviews" body={this.ratingBodyTemplate} sortable></Column>
                        <Column field="inventoryStatus" header="Status" body={this.statusBodyTemplate} sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    {this.state.product.image && <img src={`showcase/demo/images/product/${this.state.product.image}`} alt={this.state.product.image} className="product-image" />}
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={this.state.product.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.name })} />
                        {this.state.submitted && !this.state.product.name && <small className="p-invalid">Name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="description" value={this.state.product.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
                    </div>

                    <div className="p-field">
                        <label className="p-mb-3">Category</label>
                        <div className="p-formgrid p-grid">
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton id="category1" name="category" value="Accessories" onChange={this.onCategoryChange} checked={this.state.product.category === 'Accessories'} />
                                <label htmlFor="category1">Accessories</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton id="category2" name="category" value="Clothing" onChange={this.onCategoryChange} checked={this.state.product.category === 'Clothing'} />
                                <label htmlFor="category2">Clothing</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton id="category3" name="category" value="Electronics" onChange={this.onCategoryChange} checked={this.state.product.category === 'Electronics'} />
                                <label htmlFor="category3">Electronics</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton id="category4" name="category" value="Fitness" onChange={this.onCategoryChange} checked={this.state.product.category === 'Fitness'} />
                                <label htmlFor="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div className="p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="price">Price</label>
                            <InputNumber id="price" value={this.state.product.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="quantity">Quantity</label>
                            <InputNumber id="quantity" value={this.state.product.quantity} onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} integeronly />
                        </div>
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete the selected products?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}
export default DataTableCrudDemo;
