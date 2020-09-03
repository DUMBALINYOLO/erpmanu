import { combineReducers } from 'redux';

import accounttypescategorychoices from "./accounttypescategorychoices";
import accounttypesclassificationchoices from "./accounttypesclassificationchoices";
import assetsdepriciationmethodchoices from "./assetsdepriciationmethodchoices";
import assettypeschoices from "./assettypeschoices";
import accounttypechoices from "./accounttypechoices";
import billfrequencychoices from "./billfrequencychoices";
import accountbalancesheetcategorieschoices from "./accountbalancesheetcategorieschoices";
import interestintervalaccountchoices from "./interestintervalaccountchoices";
import accountinterestmethodchoices from "./accountinterestmethodchoices";
import inventoryvaluationperiodchoices from "./inventoryvaluationperiodchoices";
import inventoryvaluationmethodschoices from "./inventoryvaluationmethodschoices";
import inventorycheckfrequencychoices from "./inventorycheckfrequencychoices";
import inventorycheckdatechoices from "./inventorycheckdatechoices";
import unitofmeasurechoices from "./unitofmeasurechoices";
import customeraddresstypechoices from "./customeraddresstypechoices";
import employeesattendancestatuschoices from "./employeesattendancestatuschoices";
import employeestypechoices from "./employeestypechoices";
import billpaymentstatuschoices from "./billpaymentstatuschoices";
import supplieraddresstypechoices from "./supplieraddresstypechoices";
import supplierstatuschoices from "./supplierstatuschoices";
import customerstatuschoices from "./customerstatuschoices";
import billingchoices from "./billingchoices";
import billpaymentmethodschoices from "./billpaymentmethodschoices";
import invoicesalestypeschoices from "./invoicesalestypeschoices";
import inventoryorderpaymentmethodschoices from "./inventoryorderpaymentmethodschoices";
import manufactringshifttimechoices from "./manufactringshifttimechoices";
import eventprioritychoices from "./eventprioritychoices";
import eventparticipanttypeschoices from "./eventparticipanttypeschoices";
import eventreminderchoices from "./eventreminderchoices";
import eventtimechoices from "./eventtimechoices";
import eventiconchoices from "./eventiconchoices";
import eventrepeatchoices from "./eventrepeatchoices";
import employeepayrolltaxchoices from "./employeepayrolltaxchoices";
import natureofemploymentchoices from "./natureofemploymentchoices";
import employeeyearchoices from "./employeeyearchoices";
import employeetimesheetmonthchoices from "./employeetimesheetmonthchoices";
import employeepayslipstatuschoices from "./employeepayslipstatuschoices";
import employeepayrolldatechoices from "./employeepayrolldatechoices";
import employeedeductionmethods from "./employeedeductionmethods";
import employeepayfrequencies from "./employeepayfrequencies";
import employeelunchchoices from "./employeelunchchoices";
import employeeleavestatuschoices from "./employeeleavestatuschoices";
import employeeleavecategorychoices from "./employeeleavecategorychoices";
import employeecategorychoices from "./employeecategorychoices";
import employmentcontractterminationreasons from "./employmentcontractterminationreasons";
import accountingperiodschoices from "./accountingperiodschoices";
import journalentrytypeschoices from "./journalentrytypeschoices";
import employeesgenderchoices from "./employeesgenderchoices";
import inventorytypeschoices from "./inventorytypeschoices";
import productcomponentpricingchoices from "./productcomponentpricingchoices";
import equipmentcomponentconditionchoices from "./equipmentcomponentconditionchoices";
import inventoryorderstatuschoices from "./inventoryorderstatuschoices";
import invoicesaleschoices from "./invoicesaleschoices";
import invoicelinechoices from "./invoicelinechoices";
import manufacturingprocesschoices from "./manufacturingprocesschoices";
import customerpaymentmethodschoices from "./customerpaymentmethodschoices";
import processrateunittimechoices from "./processrateunittimechoices";
import manufacturingproducttypeschoices from "./manufacturingproducttypeschoices";
import billofmaterialslinechoices from "./billofmaterialslinechoices";
import processedproductsstockstatuschoices from "./processedproductsstockstatuschoices";
import accounts from "./accounts";
import interestbearingaccounts from "./interestbearingaccounts";
import journals from "./journals";
import ledgers from "./ledgers";
import accountingposts from "./accountingposts";
import workbooks from "./workbooks";
import accountingadjustments from "./accountingadjustments";
import debits from "./debits";
import credits from "./credits";
import fullypaidnotverifiedbills from "./fullypaidnotverifiedbills";
import fullypaidbills from "./fullypaidbills";
import unpostedandunadjustedjournalentries from "./unpostedandunadjustedjournalentries";
import unadjustedjournalentries from "./unadjustedjournalentries";
import unpostedjournalentries from "./unpostedjournalentries";
import postedjournalentries from "./postedjournalentries";
import inactiveaccounts from "./inactiveaccounts";
import assets from "./assets";
import taxes from "./taxes";
import currencies from "./currencies";
import bills from "./bills";
import billpayments from "./billpayments";
import unverifiedproductionprocesses from "./unverifiedproductionprocesses";
import verifiedproductionprocesses from "./verifiedproductionprocesses";
import processmachines from "./processmachines";
import processmachinegroups from "./processmachinegroups";
import shifts from "./shifts";
import shiftschedules from "./shiftschedules";
import processrates from "./processrates";
import productionorders from "./productionorders";
import manufacturingteams from "./manufacturingteams";
import manufacturingpersonels from "./manufacturingpersonels";
import processproducts from "./processproducts";
import wastegenerationreports from "./wastegenerationreports";
import processedproductstockreceipts from "./processedproductstockreceipts";
import processedproductstockadjustments from "./processedproductstockadjustments";
import processedproductstocktakes from "./processedproductstocktakes";
import inventorycategories from "./inventorycategories";
import debitnotes from "./debitnotes";
import inventoryorders from "./inventoryorders";
import inventoryorderpayments from "./inventoryorderpayments";
import warehouses from "./warehouses";
import inventorystockitems from "./inventorystockitems";
import storagemedias from "./storagemedias";
import orderitems from "./orderitems";
import inventoryreceipts from "./inventoryreceipts";
import stockadjustments from "./stockadjustments";
import inventorystocktakes from "./inventorystocktakes";
import activesuppliers from "./activesuppliers";
import deactivedsuppliers from "./deactivedsuppliers";
import supplieraddresses from "./supplieraddresses";
import rawmaterials from "./rawmaterials";
import equipments from "./equipments";
import upcomingevents from "./upcomingevents";
import consumables from "./consumables";
import completedevents from "./completedevents";
import eventconfigs from "./eventconfigs";
import fullyreceivedandtotalpaidfororders from "./fullyreceivedandtotalpaidfororders";
import fullyreceivedtotalpaidforandverifiedorders from "./fullyreceivedtotalpaidforandverifiedorders";
import employeeconfigs from "./employeeconfigs";
import employeecontracts from "./employeecontracts";
import employeecontractsterminations from "./employeecontractsterminations";
import employeedepartments from "./employeedepartments";
import employeeleaves from "./employeeleaves";
import employeepaygrades from "./employeepaygrades";
import employeeallowances from "./employeeallowances";
import employeepaydeductions from "./employeepaydeductions";
import employeepaycommissionrules from "./employeepaycommissionrules";
import employeepayrolltaxes from "./employeepayrolltaxes";
import employeepayrollschedules from "./employeepayrollschedules";
import employeepayrolldates from "./employeepayrolldates";
import employeepayslips from "./employeepayslips";
import employeeattendancetimesheets from "./employeeattendancetimesheets";
import companyshareholders from "./companyshareholders";
import companymanagers from "./companymanagers";
import companybookkeepers from "./companybookkeepers";
import companypayrollofficers from "./companypayrollofficers";
import companydrivers from "./companydrivers";
import companymanufacturingpersonells from "./companymanufacturingpersonells";
import companyinventorycontrollers from "./companyinventorycontrollers";
import companysalesreps from "./companysalesreps";
import pendingemployeeleaves from "./pendingemployeeleaves";
import authorisedemployeeleaves from "./authorisedemployeeleaves";
import declinedemployeeleaves from "./declinedemployeeleaves";
import deactivatedcustomers from "./deactivatedcustomers";
import customeraddresses from "./customeraddresses";
import activecustomers from "./activecustomers";
import creditnotes from "./creditnotes";
import payments from "./payments";
import receipts from "./receipts";
import invoicelines from "./invoicelines";
import salesgroupspricingdiscounts from "./salesgroupspricingdiscounts";
import quotations from "./quotations";
import unverifiedinvoices from "./unverifiedinvoices";
import overdueinvoices from "./overdueinvoices";
import voidedinvoices from "./voidedinvoices";
import refundedinvoices from "./refundedinvoices";
import fullypaidnotyetsalesinvoices from "./fullypaidnotyetsalesinvoices";
import sales from "./sales";
import manufacturedstockitems from "./manufacturedstockitems";


export default combineReducers({
    creditnotes,
    manufacturedstockitems,
    payments,
    receipts,
    invoicelines,
    salesgroupspricingdiscounts,
    quotations,
    unverifiedinvoices,
    overdueinvoices,
    voidedinvoices,
    refundedinvoices,
    fullypaidnotyetsalesinvoices,
    sales,
    deactivatedcustomers,
    customeraddresses,
    activecustomers,
    companyshareholders,
    companymanagers,
    companybookkeepers,
    companypayrollofficers,
    companydrivers,
    companymanufacturingpersonells,
    companyinventorycontrollers,
    companysalesreps,
    pendingemployeeleaves,
    authorisedemployeeleaves,
    declinedemployeeleaves,
    employeeconfigs,
    employeecontracts,
    employeecontractsterminations,
    employeedepartments,
    employeeleaves,
    employeepaygrades,
    employeeallowances,
    employeepaydeductions,
    employeepaycommissionrules,
    employeepayrolltaxes,
    employeepayrollschedules,
    employeepayrolldates,
    employeepayslips,
    employeeattendancetimesheets,
    accounttypescategorychoices,
    assettypeschoices,
    inventorycategories,
    debitnotes,
    eventconfigs,
    completedevents,
    upcomingevents,
    fullyreceivedtotalpaidforandverifiedorders,
    fullyreceivedandtotalpaidfororders,
    consumables,
    equipments,
    rawmaterials,
    supplieraddresses,
    deactivedsuppliers,
    activesuppliers,
    inventorystocktakes,
    inventoryreceipts,
    stockadjustments,
    orderitems,
    storagemedias,
    inventorystockitems,
    warehouses,
    inventoryorderpayments,
    inventoryorders,
    processedproductstocktakes,
    processedproductstockadjustments,
    processedproductstockreceipts,
    wastegenerationreports,
    productionorders,
    processproducts,
    manufacturingpersonels,
    manufacturingteams,
    shiftschedules,
    processrates,
    shifts,
    processmachines,
    processmachinegroups,
    verifiedproductionprocesses,
    inactiveaccounts,
    assets,
    unverifiedproductionprocesses,
    billpayments,
    bills,
    currencies,
    taxes,
    postedjournalentries,
    unpostedjournalentries,
    unadjustedjournalentries,
    unpostedandunadjustedjournalentries,
    fullypaidbills,
    fullypaidnotverifiedbills,
    credits,
    debits,
    workbooks,
    accountingadjustments,
    ledgers,
    accountingposts,
    accounts,
    journals,
    interestbearingaccounts,
    processedproductsstockstatuschoices,
    billofmaterialslinechoices,
    manufacturingproducttypeschoices,
    processrateunittimechoices,
    customerpaymentmethodschoices,
    invoicesaleschoices,
    manufacturingprocesschoices,
    invoicelinechoices,
    inventoryorderstatuschoices,
    productcomponentpricingchoices,
    equipmentcomponentconditionchoices,
    inventorytypeschoices,
    employeesgenderchoices,
    accountingperiodschoices,
    journalentrytypeschoices,
    employmentcontractterminationreasons,
    employeecategorychoices,
    employeeleavecategorychoices,
    employeeleavestatuschoices,
    employeelunchchoices,
    employeepayfrequencies,
    employeedeductionmethods,
    employeepayrolldatechoices,
    employeepayslipstatuschoices,
    employeetimesheetmonthchoices,
    employeeyearchoices,
    natureofemploymentchoices,
    employeepayrolltaxchoices,
    eventrepeatchoices,
    eventiconchoices,
    eventtimechoices,
    eventreminderchoices,
    eventparticipanttypeschoices,
    manufactringshifttimechoices,
    eventprioritychoices,
    billingchoices,
    inventoryorderpaymentmethodschoices,
    invoicesalestypeschoices,
    billpaymentmethodschoices,
    customerstatuschoices,
    supplierstatuschoices,
    supplieraddresstypechoices,
    billpaymentstatuschoices,
    employeestypechoices,
    unitofmeasurechoices,
    employeesattendancestatuschoices,
    customeraddresstypechoices,
    inventorycheckdatechoices,
    inventorycheckfrequencychoices,
    inventoryvaluationmethodschoices,
    inventoryvaluationperiodchoices,
    accountinterestmethodchoices,
    interestintervalaccountchoices,
    accountbalancesheetcategorieschoices,
    billfrequencychoices,
    accounttypechoices,
    accounttypesclassificationchoices,
    assetsdepriciationmethodchoices,

});
