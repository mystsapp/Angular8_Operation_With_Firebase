import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(public customerService: CustomerService) { }
  customerArray = [];
  showDeletedMessage: boolean;
  searchText = '';

  ngOnInit() {
    this.customerService.getCustomers().subscribe(list => {
      this.customerArray = list.map(item => {
        return {
          id: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  onDelete(id: string) {
    if (confirm('Are you sure want to delete this record?')) {
      this.customerService.deleteCustomer(id);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  filterCondition(customer) {
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ;
  }

}
