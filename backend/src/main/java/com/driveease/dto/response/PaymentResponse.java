package com.driveease.dto.response;

import com.driveease.entity.enums.PaymentMethod;
import com.driveease.entity.enums.PaymentStatus;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class PaymentResponse {
    private Long id;
    private String transactionId;
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private ZonedDateTime paymentDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public ZonedDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(ZonedDateTime paymentDate) { this.paymentDate = paymentDate; }
}
