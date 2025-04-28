
-- Bảng account
CREATE TABLE account (
  accountid VARCHAR(50) PRIMARY KEY,
  password VARCHAR(255),
  role VARCHAR(20)
);

-- Bảng user
CREATE TABLE user (
  userid VARCHAR(50) PRIMARY KEY,
  email VARCHAR(100),
  fullname VARCHAR(100),
  phonenumber VARCHAR(20),
  address TEXT,
  FOREIGN KEY (userid) REFERENCES account(accountid)
);

use WATCH_AURA;
CREATE TABLE discount (
  discountid VARCHAR(50) PRIMARY KEY,
  discountpercentage DECIMAL(5,2),
  startdate TIMESTAMP,
  enddate TIMESTAMP,
  status ENUM('active', 'expired', 'inactive')
);

-- Bảng product
CREATE TABLE product (
  productid VARCHAR(50) PRIMARY KEY,
  productname VARCHAR(100),
  productcategoryid VARCHAR(50),
  description TEXT,
  price DECIMAL(10,2),
  imageurl VARCHAR(255),
  creationdate TIMESTAMP,
  discountid VARCHAR(50),
  FOREIGN KEY (discountid) REFERENCES discount(discountid)
);

-- Bảng watchcategory
CREATE TABLE watchcategory (
  categoryid VARCHAR(50) PRIMARY KEY,
  categoryname VARCHAR(100),
  features TEXT,
  brandid VARCHAR(50)
);

-- Bảng watch
CREATE TABLE watch (
  productid VARCHAR(50) PRIMARY KEY,
  nameid VARCHAR(50),
  categoryid VARCHAR(50),
  casematerial VARCHAR(50),
  strapmaterial VARCHAR(50),
  strapcolor VARCHAR(30),
  diameter VARCHAR(10),
  thickness VARCHAR(10),
  waterresistance VARCHAR(10),
  movementtype VARCHAR(50),
  dialcolor VARCHAR(30),
  quantity INT,
  FOREIGN KEY (productid) REFERENCES product(productid),
  FOREIGN KEY (categoryid) REFERENCES watchcategory(categoryid)
);

-- Bảng ring
CREATE TABLE ring (
  productid VARCHAR(50) PRIMARY KEY,
  nameid VARCHAR(50),
  size INT,
  quantity INT,
  FOREIGN KEY (productid) REFERENCES product(productid)
);

-- Bảng albert
CREATE TABLE albert (
  productid VARCHAR(50) PRIMARY KEY,
  nameid VARCHAR(50),
  size INT,
  rim VARCHAR(50),
  quantity INT,
  FOREIGN KEY (productid) REFERENCES product(productid)
);

-- Bảng product_image
CREATE TABLE product_image (
  imageid VARCHAR(50) PRIMARY KEY,
  productid VARCHAR(50),
  imageurl VARCHAR(255),
  is_main BOOLEAN,
  uploadeddate TIMESTAMP,
  FOREIGN KEY (productid) REFERENCES product(productid)
);

-- Bảng paymentmethod
CREATE TABLE paymentmethod (
  paymentmethodid VARCHAR(50) PRIMARY KEY,
  paymentmethodname VARCHAR(100)
);

-- Bảng shippingcompany (bạn cần thêm nếu dùng)
CREATE TABLE shippingcompany (
  shippingcompanyid VARCHAR(50) PRIMARY KEY,
  companyname VARCHAR(100)
);

-- Bảng order
CREATE TABLE `order` (
  orderid VARCHAR(50) PRIMARY KEY,
  userid VARCHAR(50),
  totalamount DECIMAL(10,2),
  status ENUM('pending_confirmation', 'processing', 'shipping', 'delivered', 'cancelled'),
  paymentmethodid VARCHAR(50),
  shippingcompanyid VARCHAR(50),
  creationdate TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES account(accountid),
  FOREIGN KEY (paymentmethodid) REFERENCES paymentmethod(paymentmethodid),
  FOREIGN KEY (shippingcompanyid) REFERENCES shippingcompany(shippingcompanyid)
);

-- Bảng orderdetail
CREATE TABLE orderdetail (
  orderdetailid VARCHAR(50) PRIMARY KEY,
  orderid VARCHAR(50),
  productid VARCHAR(50),
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (orderid) REFERENCES `order`(orderid),
  FOREIGN KEY (productid) REFERENCES product(productid)
);

-- Bảng review
CREATE TABLE review (
  reviewid VARCHAR(50) PRIMARY KEY,
  userid VARCHAR(50),
  productid VARCHAR(50),
  rating INT,
  comment TEXT,
  creationdate TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES account(accountid),
  FOREIGN KEY (productid) REFERENCES product(productid)
);

-- Bảng cart
CREATE TABLE cart (
  cartid VARCHAR(50) PRIMARY KEY,
  userid VARCHAR(50),
  productid VARCHAR(50),
  quantity INT,
  addeddate TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES account(accountid),
  FOREIGN KEY (productid) REFERENCES product(productid)
);

