# '''
# A manufacturing process has involves the transformation of
# raw materials into finished products using some process
# the input is the raw materials, time, machinery and human labour
# the output is finished goods.
# waste is a byproduct of a process.
# the quality of the output needs to be measured
# during manufacturing material location at any given moment in time must be known
#
# when a production order is generated. the required machine(s) are reserved
# time is allocated for the job and a team/shift is assigned to it.
# the raw materials are reserved for the process.
# The expected waste is calculated and raw materials are assigned accordingly
#
# at each stage of the multistage process,
# output in the form of work in progress is recorded
# the amount of waste generated is also recorded.
# the time taken to complete the stage is also recorded.
#
# at the end of the process the sum of all these records are
# added to the grand total for that process
#
# the system must allow interruptions in the process to be accounted
# for and root cause analysis to be performed
#
# time is managed as part of shifts that organize the employees working on them
# and the production schedule that is followed by the machine.
#
# when a production order is generated the process products are
# evaluated and a suggested process is generated. that process is
# then used to update the production schedule. once a process is scheduled,
# its status page is updated.
#
#
# he makes foam rubbers
# 8 hour production
# has machines
# multistage process (3)
#     - preparation  cleaning machines heating chemicals
#     - mixing recipie for foam rubber
#     - forming
#     - cooling and drying
#     - cutting
# multiproduct process
# waste generated
# co product and by product
#
#
# board making
# multistage process
#     - starch preparation (batch process)
#     - single facing
#     - double facing
#     - cutting and slotting
#     - work in progress
#     - printing
#     - folding and gluing
#     - strapping
# '''

class ProductionOrder(models.Model):
    #we cool

class Process(models.Model):
    # we cool ma nigga

class ProcessRate(models.Model):
    UNIT_TIME_CHOICES = [
            (0, 'per second'),
            (1, 'per minute'),
            (2, 'per hour'),
        ]

    # we cool ma nigga

class ProductList(models.Model):
    #we cool
    def products(self):
        return ProcessProduct.objects.filter(product_list=self)
    # we need to call you ma nigga


class ProcessProduct(models.Model):
    PRODUCT_TYPES = [
        (0, 'Product'),
        (1, 'By-Product'),
        (2, 'Co-Product'),
        (3, 'Waste')
    ]

    def type_string(self):
        return dict(self.PRODUCT_TYPES)[self.type]
    # display this motherfucker

class WasteGenerationReport(models.Model):
    #we cool

class BillOfMaterials(models.Model):
    # we cool

class BillOfMaterialsLine(models.Model):
    # we cool

    @property
    def machines(self):
        return ProcessMachine.objects.filter(machine_group=self)

    # what do we do with you


class ProcessMachine(models.Model):
    # we cool

class Shift(models.Model):
    #we cool

# engineering shift, bm shift etc
class ShiftSchedule(models.Model):
    # well well
        @property
        def shifts(self):
            return ShiftScheduleLine.objects.filter(schedule=self)

class ShiftScheduleLine(models.Model):
    # we cool


class ManufacturingAssociate(models.Model):
    # we cool

class ProductionScheduleLine(models.Model):#rename event


class ProductionSchedule(models.Model):
    pass
